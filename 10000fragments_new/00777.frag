uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.97 + ph), sin(lt * 4.0 + t * 0.37)) * 0.98;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.20) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.87) - 0.5;
    float rad = 0.34 + 0.12 * sin(t * 1.69 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.64;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * 2.66 + time * 0.59) * q1;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 2.14, lr * 1.50 + time * 0.46); }
	q2 = abs(q2) - 0.27;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.63);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.72 + time * 0.21);
	col *= 0.87 + 0.16 * sin(gl_FragCoord.y * 2.28 + time * 16.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
