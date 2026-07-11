uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 7.43 * sin(t * 0.78) + t * 1.40 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.41 + jf * 4.0), cos(t * 0.49 * jf)) * 0.95;
        xs += sin(length(p - im) * 146.38 - t * 13.73 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 17.02);
    float gsh = hash21(vec2(grow, floor(t * 6.12))) - 0.5;
    float gx = p.x + gsh * 0.63;
    v = sin(gx * 16.78 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.53));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.19;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1.x += sin(q1.y * 6.59 + time * 3.24) * 0.25;
	q1 = rot2(q1.y * -1.49 + time * 0.91) * q1;
	{ q3 = vec2(atan(q3.y, q3.x) * 2.06, length(q3) * 4.42 - time * 0.61); }
	q3 *= 1.99;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.43);
	float d3 = fieldC(q3, time, 1.91);
	d2 = min(d2, d3);
	float d = min(d1, d2);
	vec3 col = vec3(0.51, 0.77, 0.65) * (0.15 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
