uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.55; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 11.10 - t * 3.42 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.56), cos(time * 0.98)) * 0.10;
	float an = atan(p.y, p.x) + time * 0.75;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.04 / 3.1415927, 0.88 / r - time * 2.38);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.51 + time * 0.31);
	col *= clamp(r * 2.78, 0.0, 1.0);
	col = mod(col * 1.96, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
