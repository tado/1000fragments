uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.13 - t * 1.58;
    v = sin(floor(lv * 3.4) / 3.4 * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.60 + t * 3.84 + ph) + sin(p.y * 8.85 - t * 3.84 + ph)
        + sin((p.x + p.y) * 7.07 + t * 3.84 + ph) + sin(length(p) * 9.18 - t * 3.84 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.27;
	vec2 q1 = p; vec2 q2 = p;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 1.10;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q2 = fract(q2 * 2.85) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.63);
	float d = min(d1, d2);
	vec3 col = hue(d * 0.70 + time * 0.26);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.65 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
