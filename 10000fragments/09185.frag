uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.86; vec2 jc = vec2(0.15 + 0.3 * sin(t * 0.38 + ph), -0.11 + 0.3 * cos(t * 0.38 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 20; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(20) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.51;
	p = rot2(time * 0.24) * p;
	{ p = vec2(atan(p.y, p.x) * 2.87, length(p) * 2.58 - time * 0.70); }
	{ float fr = length(p); p *= 1.0 + 0.42 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.33 + time * 0.23, vec3(0.50, 0.41, 0.42), vec3(0.47, 0.33, 0.46), vec3(0.76, 1.32, 1.16), vec3(0.60, 0.20, 0.14));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
