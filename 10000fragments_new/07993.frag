uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 8.02; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 12.11 - t * 3.37 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.88), cos(time * 1.02)) * 0.09;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.36 / 3.1415927, 0.49 / r + time * 0.76);
	tv.x += tv.y * 0.12;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.29, 0.33, 0.42) * (0.21 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= clamp(r * 2.61, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
