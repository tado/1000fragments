uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.61 + jf * 4.0), cos(t * 0.16 * jf)) * 0.34;
        xs += sin(length(p - im) * 179.54 - t * 10.62 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.64;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.97 / 3.1415927, 1.10 / r - time * 2.78);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.64, 0.89, 0.74) + vec3(0.20, 0.20, 0.03);
	col *= clamp(r * 1.06, 0.0, 1.0);
	col = mod(col * 1.83, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
