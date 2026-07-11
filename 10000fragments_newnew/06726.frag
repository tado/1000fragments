uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.86;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.64)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 11.99 - t * 5.85 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.62 + 0.26 * sin(t * 1.43)) + vec2(-0.52, 0.09) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 24; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 24.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 10.40);
    float gsh = hash21(vec2(grow, floor(t * 3.59))) - 0.5;
    float gx = p.x + gsh * 0.70;
    v = sin(gx * 10.97 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.68));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.66;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q2); q2 *= 1.0 + -0.73 * fr * fr; }
	q2.y += sin(q2.x * 4.39 + time * 2.11) * 0.25;
	{ float iv = dot(q3, q3) + 0.05; q3 = q3 / iv * 0.75; }
	q3 = sin(q3 * 2.43 + time * 1.06) * 0.93;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.59);
	float d3 = fieldC(q3, time, 1.87);
	d2 = min(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 0.81 + time * 0.12);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
