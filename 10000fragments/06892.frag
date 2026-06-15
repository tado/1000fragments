uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.64; vec2 jc = vec2(-0.17 + 0.3 * sin(t * 0.97 + ph), -0.74 + 0.3 * cos(t * 0.97 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 23; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(23) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.48;
	p = rot2(length(p) * 2.74 + time * 0.89) * p;
	p = abs(p);
	p += vec2(-0.94, -0.58) * sin(length(p) * 4.13 - time * 1.51) * 0.10;
	p = rot2(1.79) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.52 + time * 0.27, vec3(0.50, 0.53, 0.57), vec3(0.44, 0.38, 0.37), vec3(0.80, 0.93, 0.95), vec3(0.62, 0.87, 0.10));
	col = clamp((col - 0.5) * 1.73 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
