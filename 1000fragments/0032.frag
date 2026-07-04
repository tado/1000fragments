uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.96 + 0.33 * sin(t * 1.45)) + vec2(-0.73, 0.09) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 27; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 27.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.55);
    float gsh = hash21(vec2(grow, floor(t * 3.37))) - 0.5;
    float gx = p.x + gsh * 0.41;
    v = sin(gx * 9.75 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.86));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.31 + vec2(t * 1.03, -t * 0.53);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.68;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = abs(q2) - 0.66;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.44);
	float d3 = fieldC(q3, time, 0.54);
	d2 = abs(d2 - d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.83));
	vec3 col = vec3(0.92, 0.88, 0.83) * (0.06 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.85 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
