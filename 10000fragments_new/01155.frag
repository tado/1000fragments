uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.03; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 8.84 - t * 3.12 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.95), cos(time * 0.46)) * 0.21;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.95 / 3.1415927, 1.14 / r - time * 2.47);
	tv.x += tv.y * 0.44;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.18, 0.34), vec3(0.66, 0.88, 0.40), cc);
	col *= clamp(r * 2.83, 0.0, 1.0);
	col *= 0.87 + 0.14 * sin(gl_FragCoord.y * 2.46 + time * 14.57);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
