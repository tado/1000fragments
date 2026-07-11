uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.87; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 17.23 - t * 3.30 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.45), cos(time * 0.70)) * 0.26;
	float an = atan(p.y, p.x) + time * -0.18;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.74 / 3.1415927, 0.48 / r + time * 0.94);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.31, 0.76, 0.43) * (0.12 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 1.32, 0.0, 1.0);
	col *= 0.89 + 0.13 * sin(gl_FragCoord.y * 2.72 + time * 5.58);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
