uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.45 + jf * 4.0), cos(t * 0.30 * jf)) * 0.94;
        xs += sin(length(p - im) * 165.09 - t * 5.61 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.35;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.72 / 3.1415927, 1.00 / r + time * 2.95);
	tv.x += tv.y * 0.12;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.29 + time * 0.56);
	col *= clamp(r * 2.51, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.38 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
