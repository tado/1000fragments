uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.59 + jf * 4.0), cos(t * 0.58 * jf)) * 0.74;
        xs += sin(length(p - im) * 171.35 - t * 4.38 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.01), cos(time * 0.93)) * 0.19;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.02 / 3.1415927, 0.68 / r - time * 0.58);
	tv.x += tv.y * 0.48;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.84 + time * 0.32, vec3(0.42, 0.45, 0.53), vec3(0.45, 0.48, 0.41), vec3(1.32, 1.28, 1.09), vec3(0.28, 0.51, 0.09));
	col *= clamp(r * 1.27, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
