uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.58 + jf * 4.0), cos(t * 0.55 * jf)) * 0.96;
        xs += sin(length(p - im) * 173.37 - t * 13.68 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 1.21 + ph), sin(lt * 2.0 + t * 1.17)) * 0.58;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.39) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 4; fo++){ q1 = abs(q1) - 0.41; q1 = rot2(2.44) * q1; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.44);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.28, 0.06, 0.50), vec3(0.84, 0.61, 0.92), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
