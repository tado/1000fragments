uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.22; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 18.44 - t * 0.96 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.37;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.63 / 3.1415927, 0.72 / r + time * 0.91);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.04 + time * 0.21);
	col *= clamp(r * 1.48, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
