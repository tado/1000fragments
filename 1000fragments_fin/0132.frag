uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.54; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 10.41 - t * 1.37 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * -0.32;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.19; p = rot2(0.95) * p; }
	p.x += sin(p.y * 3.09 + (time * 0.58) * 2.04) * 0.30;
	p *= 1.0 + 0.23 * sin((time * 0.58) * 2.29);
	float d = clamp(0.5 + 0.5 * field(p, (time * 0.58), 0.0), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.019, 0.009, 0.080), vec3(0.262, 0.278, 0.730), smoothstep(0.0, 0.56, d)), vec3(0.633, 0.971, 0.987), smoothstep(0.56, 1.0, d));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.34);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.004, 0.946, 0.998);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
