uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.77 * sin(mf + 3.0) + ph), cos(t * 1.97 * cos(mf + 3.0) + ph));
        ms += 0.091 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 17.88);
    float gsh = hash21(vec2(grow, floor(t * 9.75))) - 0.5;
    float gx = p.x + gsh * 0.37;
    v = sin(gx * 15.58 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.14));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.09;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.65; }
	q2 = (floor(q2 * 25.7) + 0.5) / 25.7;
	q2 = abs(q2);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.80);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.89 + time * 0.21);
	col = fract(col * 1.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
