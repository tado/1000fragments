uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.16 + jf * 4.0), cos(t * 0.24 * jf)) * 0.58;
        xs += sin(length(p - im) * 98.04 - t * 9.99 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.46), cos(time * 0.91)) * 0.19;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.37 / 3.1415927, 0.84 / r - time * 0.84);
	tv.x += tv.y * 0.13;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.25 + time * 0.34, vec3(0.47, 0.47, 0.57), vec3(0.30, 0.39, 0.41), vec3(1.22, 1.10, 1.19), vec3(0.92, 0.80, 0.51));
	col *= clamp(r * 2.94, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
