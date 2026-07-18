uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.57 + ph), sin(lt * 5.0 + t * 1.43)) * 0.81;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.09) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 6.39;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.06)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 21.45 - t * 6.04 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 4.44; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 8.14 - t * 0.60 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y) - 0.41;
	p.x *= resolution.x / resolution.y;
	p *= 2.61;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 += vec2(0.62, -0.65) * sin(length(q2) * 5.20 - (time * 0.60) * 2.45) * 0.29;
	q2 = (floor(q2 * 18.2) + 0.5) / 18.2;
	q3 = sin(q3 * 1.17 + (time * 0.60) * 1.12) * 0.92;
	q3 = (floor(q3 * 7.1) + 0.5) / 7.1;
	float d1 = fieldA(q1, (time * 0.60), 0.0);
	float d2 = fieldB(q2, (time * 0.60), 1.70);
	float d3 = fieldC(q3, (time * 0.60), 0.35);
	d2 = d2 * d3;
	float d = abs(d1 - d2);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.49, 0.44, 0.48) + vec3(0.09, 0.12, 0.12);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(0.974, 1.021, 0.930);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
