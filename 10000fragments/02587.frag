uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.45, 0.0)) * 30.41 - t * 4.07 + ph);
    float mb = sin(length(p + vec2(0.45, 0.0)) * 8.64 - t * 4.07 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.45 + sin(p.y * 1.11 + t * 2.32) * 4.95 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.25;
	{ p = vec2(atan(p.y, p.x) * 2.98, length(p) * 4.54 - time * 0.20); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.24);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.12 + time * 0.09, vec3(0.49, 0.42, 0.42), vec3(0.45, 0.41, 0.38), vec3(0.81, 1.35, 0.83), vec3(0.67, 0.15, 0.72));
	col = mod(col * 1.30, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
