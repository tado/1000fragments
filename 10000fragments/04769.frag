uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 1.00, t * 2.57)) - 0.5) * 1.32;
    v = exp(-abs(bx) * 7.41) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.95 + t * 3.58 + ph) * 0.7;
    float wb = sin(p.y * 14.76 - t * 2.53 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.69;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.74;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q1.x += 0.41 / wf * sin(wf * 2.99 * q1.y + time * 0.69); q1.y += 0.44 / wf * cos(wf * 1.57 * q1.x + time * 1.60); }
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 2.19));
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.24 / wf * sin(wf * 1.90 * q2.y + time * 1.46); q2.y += 0.46 / wf * cos(wf * 3.75 * q2.x + time * 2.18); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.74);
	float d = max(d1, d2);
	vec3 col = hue(d * 1.06 + time * 0.38);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.76 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
