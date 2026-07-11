uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.55; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 19.18 - t * 0.52 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.75;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.55 / 3.1415927, 0.66 / r + time * 1.46);
	tv.x += tv.y * 0.34;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.84 + time * 0.07, vec3(0.43, 0.55, 0.53), vec3(0.42, 0.32, 0.41), vec3(0.94, 1.34, 0.76), vec3(0.92, 0.90, 0.12));
	col *= clamp(r * 1.58, 0.0, 1.0);
	col = mod(col * 2.94, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
