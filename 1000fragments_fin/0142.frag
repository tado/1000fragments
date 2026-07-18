uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.84; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 22.45 - t * 3.05 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 3.34 * p.y + (time * 0.71) * 0.75); p.y += 0.34 / wf * cos(wf * 3.26 * p.x + (time * 0.71) * 1.57); }
	float d = field(p, (time * 0.71), 0.0);
	vec3 col = vec3(0.493, 0.868, 0.915) * (0.05 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(0.980, 1.015, 0.956);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
