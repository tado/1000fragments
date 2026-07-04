uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.74; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 27.57 - t * 0.81 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.15;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.63 / 3.1415927, 1.22 / r + time * 2.66);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.24, 0.25), vec3(0.81, 0.65, 0.77), cc);
	col *= clamp(r * 2.32, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.86 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
