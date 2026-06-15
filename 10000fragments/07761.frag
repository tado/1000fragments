uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.62 + jf * 4.0), cos(t * 0.31 * jf)) * 0.52;
        xs += sin(length(p - im) * 138.83 - t * 12.38 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.08) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.26, length(p) * 2.75 - time * 0.53); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.90 + time * 0.28, vec3(0.55, 0.49, 0.56), vec3(0.30, 0.32, 0.38), vec3(1.19, 1.14, 1.36), vec3(0.24, 0.32, 0.55));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
