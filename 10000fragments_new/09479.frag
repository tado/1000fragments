uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.26 + jf * 4.0), cos(t * 0.32 * jf)) * 0.63;
        xs += sin(length(p - im) * 162.61 - t * 9.72 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.14;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.43 / 3.1415927, 1.19 / r + time * 2.87);
	tv.x += tv.y * 0.35;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.05, 0.28, 0.15), vec3(0.88, 0.98, 0.55), cc);
	col *= clamp(r * 2.05, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
