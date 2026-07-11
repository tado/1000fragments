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
        vec2 im = vec2(sin(t * 0.24 + jf * 4.0), cos(t * 0.54 * jf)) * 0.57;
        xs += sin(length(p - im) * 115.37 - t * 8.06 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.02 / 3.1415927, 1.28 / r + time * 1.37);
	tv.x += tv.y * 0.40;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.86 + time * 0.00, vec3(0.58, 0.60, 0.46), vec3(0.35, 0.46, 0.49), vec3(1.10, 1.21, 0.94), vec3(0.80, 0.38, 0.57));
	col *= clamp(r * 1.81, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
