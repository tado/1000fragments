uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.07; vec2 jc = vec2(-0.69 + 0.3 * sin(t * 1.48 + ph), -0.05 + 0.3 * cos(t * 1.21 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 19; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 19.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.62 + t * 1.59 + ph) + sin(p.y * 9.82 - t * 2.84 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.94;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.76);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.80 + time * 0.05, vec3(0.60, 0.53, 0.56), vec3(0.46, 0.46, 0.36), vec3(1.13, 0.71, 1.38), vec3(0.74, 0.51, 0.23));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
