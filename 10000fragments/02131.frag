uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.89 - t * 0.68;
    v = sin(floor(lv * 4.3) / 4.3 * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.57 + jf * 4.0), cos(t * 0.33 * jf)) * 0.71;
        xs += sin(length(p - im) * 90.66 - t * 11.78 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.48;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 0.99)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 10.68 - t * 3.77 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.89;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1.y += sin(q1.x * 5.03 + time * 3.29) * 0.20;
	q1 = rot2(0.67) * q1;
	q3 = rot2(length(q3) * -2.46 + time * 0.54) * q3;
	q3 *= 1.46;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.34);
	float d3 = fieldC(q3, time, 0.46);
	d2 = 0.5 * (d2 + d3);
	float d = d1 * d2;
	vec3 col = vec3(0.82, 0.28, 0.52) * (0.15 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
