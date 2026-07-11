uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.14 + t * 1.95 + ph) + sin(p.y * 8.46 - t * 1.65 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.42 - t * 0.62;
    v = sin(floor(lv * 3.7) / 3.7 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.17 + (time * 0.65) * 0.65) * 0.11;
	p *= 1.45;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 3.04;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin((time * 0.65) * 0.89));
	float d1 = fieldA(q1, (time * 0.65), 0.0);
	float d2 = fieldB(q2, (time * 0.65), 1.57);
	float d = min(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.50, 0.51, 0.49) + vec3(0.05, 0.06, 0.04);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(0.956, 0.997, 0.949) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
