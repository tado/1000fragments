uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.15; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 12.27 - t * 3.26 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.28 + sin(p.y * 5.81 + t * 4.29) * 4.04 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.62) * 0.38), cos((time * 0.62) * 0.45)) * 0.23;
	p = p.yx;
	p *= 1.69;
	vec2 q1 = p; vec2 q2 = p;
	q2 = abs(q2);
	q2 = fract(q2 * 1.16) - 0.5;
	float d1 = fieldA(q1, (time * 0.62), 0.0);
	float d2 = fieldB(q2, (time * 0.62), 0.65);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.618, 0.874, 0.961) * (0.05 / (abs((d)) + 0.03));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.63));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.013, 1.009, 1.006);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.41 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
