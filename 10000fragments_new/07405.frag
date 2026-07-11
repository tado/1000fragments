uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.63 + jf * 4.0), cos(t * 0.10 * jf)) * 0.91;
        xs += sin(length(p - im) * 94.10 - t * 13.07 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.55 / 3.1415927, 1.39 / r - time * 2.18);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.27, 0.87, 0.70) + vec3(0.11, 0.18, 0.11);
	col *= clamp(r * 1.18, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.35 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
