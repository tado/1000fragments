uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.67 + ph), sin(lt * 4.0 + t * 0.94)) * 0.57;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.31) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.26 + t * 1.37) - 0.5) * 2.0;
    v = sin((p.y * 3.80 + zx * 1.50 + t * 1.16) * 3.1415927 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.78 + jf * 4.0), cos(t * 0.29 * jf)) * 0.64;
        xs += sin(length(p - im) * 110.48 - t * 11.55 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.96);
	float d3 = fieldC(q3, time, 0.49);
	d2 = d2 * d3;
	float d = abs(d1 - d2);
	vec3 col = hue(d * 0.93 + time * 0.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
