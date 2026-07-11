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
        vec2 im = vec2(sin(t * 0.79 + jf * 4.0), cos(t * 0.50 * jf)) * 0.77;
        xs += sin(length(p - im) * 179.41 - t * 4.77 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.21;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.62 / 3.1415927, 0.75 / r + time * 0.74);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.07 + time * 0.40, vec3(0.59, 0.42, 0.55), vec3(0.44, 0.35, 0.43), vec3(1.01, 1.11, 1.18), vec3(0.29, 0.41, 0.23));
	col *= clamp(r * 2.27, 0.0, 1.0);
	col = mod(col * 1.67, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
