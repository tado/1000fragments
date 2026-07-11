uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.23 + jf * 4.0), cos(t * 0.38 * jf)) * 0.44;
        xs += sin(length(p - im) * 111.94 - t * 11.41 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.64), cos(time * 1.40)) * 0.27;
	float an = atan(p.y, p.x) + time * -0.45;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.16 / 3.1415927, 1.33 / r + time * 1.28);
	tv.x += tv.y * 0.19;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.31 + time * 0.30, vec3(0.51, 0.44, 0.55), vec3(0.45, 0.39, 0.40), vec3(0.83, 0.76, 0.87), vec3(0.86, 0.38, 0.18));
	col *= clamp(r * 1.02, 0.0, 1.0);
	col = mod(col * 1.48, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
