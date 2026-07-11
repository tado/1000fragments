uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.19);
    float gsh = hash21(vec2(grow, floor(t * 7.27))) - 0.5;
    float gx = p.x + gsh * 0.32;
    v = sin(gx * 8.66 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.38));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.70 * sin(mf + 3.0) + ph), cos(t * 0.82 * cos(mf + 3.0) + ph));
        ms += 0.078 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.71;
	vec2 q1 = p; vec2 q2 = p;
	q2 += vec2(0.25, -0.30) * sin(length(q2) * 5.01 - time * 1.52) * 0.11;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.70);
	float d = max(d1, d2);
	vec3 col = hue(d * 1.40 + time * 0.29);
	col = mod(col * 2.65, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
