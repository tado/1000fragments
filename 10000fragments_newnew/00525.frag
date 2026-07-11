uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.55 + jf * 4.0), cos(t * 0.36 * jf)) * 0.31;
        xs += sin(length(p - im) * 95.47 - t * 13.18 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.28 / 3.1415927, 1.43 / r - time * 2.71);
	tv.x += tv.y * 0.34;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.10, 0.21, 0.33), vec3(0.71, 0.98, 0.90), cc);
	col *= clamp(r * 2.32, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
