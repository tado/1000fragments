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
        vec2 im = vec2(sin(t * 0.45 + jf * 4.0), cos(t * 0.32 * jf)) * 0.68;
        xs += sin(length(p - im) * 110.40 - t * 6.86 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.65), cos(time * 0.52)) * 0.08;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.61 / 3.1415927, 0.42 / r + time * 1.73);
	tv.x += tv.y * 0.32;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.73 + time * 0.34, vec3(0.52, 0.42, 0.51), vec3(0.47, 0.34, 0.50), vec3(1.15, 1.06, 1.14), vec3(0.28, 0.96, 0.32));
	col *= clamp(r * 2.65, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
