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
    float grow = floor(p.y * 22.95);
    float gsh = hash21(vec2(grow, floor(t * 5.62))) - 0.5;
    float gx = p.x + gsh * 0.83;
    v = sin(gx * 18.23 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.34));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.54 + ph), vnoise2(p * 3.54 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.54 + 3.08 * wq + vec2(1.7, 9.2) + t * 0.97),
                   vnoise2(p * 3.54 + 2.83 * wq + vec2(8.3, 2.8) - t * 0.54));
    v = vnoise2(p * 3.54 + 3.67 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.14;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q1.x += 0.22 / wf * sin(wf * 2.47 * q1.y + time * 0.89); q1.y += 0.21 / wf * cos(wf * 3.37 * q1.x + time * 1.31); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.91);
	float d = min(d1, d2);
	vec3 col = hue(d * 1.46 + time * 0.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
