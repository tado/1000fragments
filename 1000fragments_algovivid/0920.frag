uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.38; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 15.78 - t * 2.30 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.71 + (time * 0.75) * 0.62) * 0.05;
	float an = atan(p.y, p.x) + (time * 0.75) * 0.58;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.90 / 3.1415927, 1.36 / r - (time * 0.75) * 2.68);
	float d = field(tv, (time * 0.75), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.37, 0.27, 0.21), vec3(0.58, 0.70, 0.67), smoothstep(0.0, 1.0, cc));
	col *= clamp(r * 1.89, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col = clamp(col, 0.0, 1.0) * vec3(0.931, 0.997, 1.034) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
