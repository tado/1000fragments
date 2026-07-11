uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.92 + jf * 4.0), cos(t * 0.49 * jf)) * 0.48;
        xs += sin(length(p - im) * 69.95 - t * 7.31 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.85), cos(time * 0.79)) * 0.07;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.48 / 3.1415927, 1.14 / r - time * 2.44);
	tv.x += tv.y * 0.29;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.33 + time * 0.12);
	col *= clamp(r * 2.32, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
