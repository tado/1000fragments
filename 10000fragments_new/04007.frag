uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.70 * sin(mf + 3.0) + ph), cos(t * 2.45 * cos(mf + 3.0) + ph));
        ms += 0.088 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.35);
    float gsh = hash21(vec2(grow, floor(t * 2.33))) - 0.5;
    float gx = p.x + gsh * 0.78;
    v = sin(gx * 15.69 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.14));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.53;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -2.15 + time * 1.16) * q1;
	q2.x += sin(q2.y * 3.90 + time * 3.32) * 0.34;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.56);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.26 + time * 0.69);
	col = clamp((col - 0.5) * 1.81 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
