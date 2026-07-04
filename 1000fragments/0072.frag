uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.59);
    float gsh = hash21(vec2(grow, floor(t * 3.80))) - 0.5;
    float gx = p.x + gsh * 0.36;
    v = sin(gx * 9.60 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.46));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.47 + 0.29 * sin(t * 0.94)) + vec2(-0.54, 0.13) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 22; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 22.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 23.1) + 0.5) / 23.1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.88);
	float d = min(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.87, 0.90, 0.98) + vec3(0.22, 0.19, 0.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
