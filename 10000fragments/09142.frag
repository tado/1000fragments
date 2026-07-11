uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.16 + sin(p.y * 4.00 + t * 5.91) * 1.60 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.24 + jf * 4.0), cos(t * 0.52 * jf)) * 0.56;
        xs += sin(length(p - im) * 165.84 - t * 12.74 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	p *= 2.27;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.96);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.26 + time * 0.29, vec3(0.54, 0.48, 0.43), vec3(0.34, 0.48, 0.31), vec3(0.91, 1.16, 0.91), vec3(0.91, 0.10, 0.03));
	col = clamp((col - 0.5) * 1.79 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
