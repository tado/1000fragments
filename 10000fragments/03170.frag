uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.20 + vec2(t * 0.53, -t * 0.53) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.72 + sin(p.y * 2.80 + t * 0.53) * 4.63 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.07;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.62);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.09 + time * 0.25, vec3(0.55, 0.59, 0.41), vec3(0.39, 0.36, 0.42), vec3(1.38, 0.92, 1.21), vec3(0.29, 0.47, 0.52));
	col = mod(col * 2.84, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
