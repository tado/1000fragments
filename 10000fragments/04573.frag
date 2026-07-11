uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 22.82 - t * 2.59 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 29.19 - t * 2.59 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.20 + vec2(t * 0.92, -t * 0.92) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.52;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.68);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.38 + time * 0.06, vec3(0.40, 0.49, 0.42), vec3(0.49, 0.39, 0.48), vec3(0.82, 0.95, 1.19), vec3(0.37, 0.35, 0.24));
	col = mod(col * 2.26, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
