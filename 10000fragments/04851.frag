uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.61 - t * 5.11 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.53 + ph), sin(lt * 4.0 + t * 1.13)) * 0.82;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.23) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.80;
	vec2 q1 = p; vec2 q2 = p;
	q1 = sin(q1 * 2.69 + time * 1.15) * 1.22;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 0.84;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.72;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.15);
	float d = d1 * d2;
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.37, 1.11, 0.54) + vec3(0.03, 0.18, 0.01);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
