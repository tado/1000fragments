uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.45; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 27.00 - t * 1.63 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.40), cos(time * 0.66)) * 0.30;
	float an = atan(p.y, p.x) + time * -0.72;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.52 / 3.1415927, 1.01 / r + time * 1.66);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.05 + time * 0.36);
	col *= clamp(r * 1.22, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
