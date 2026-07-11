uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.74 + jf * 4.0), cos(t * 0.36 * jf)) * 0.97;
        xs += sin(length(p - im) * 122.49 - t * 12.91 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.33), cos(time * 0.98)) * 0.22;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.77 / 3.1415927, 0.30 / r - time * 2.29);
	tv.x += tv.y * 0.24;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.41, 0.85, 0.42) * (0.10 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 1.12, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
