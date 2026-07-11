uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.58; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 16.10 - t * 2.31 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.15 / 3.1415927, 0.73 / r - time * 2.95);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.09 + time * 0.11, vec3(0.49, 0.40, 0.46), vec3(0.33, 0.48, 0.32), vec3(1.25, 1.35, 0.89), vec3(0.87, 0.43, 0.05));
	col *= clamp(r * 1.22, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
