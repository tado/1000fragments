uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 8.41; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 15.28 - t * 3.09 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.36;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.40 / 3.1415927, 1.06 / r - time * 2.69);
	tv.x += tv.y * 0.47;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.33, 0.30, 0.38), vec3(0.89, 0.73, 0.96), cc);
	col *= clamp(r * 1.98, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
