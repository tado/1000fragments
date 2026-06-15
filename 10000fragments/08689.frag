uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.21 + jf * 4.0), cos(t * 0.22 * jf)) * 0.51;
        xs += sin(length(p - im) * 86.97 - t * 10.55 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.84;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.18 + time * 0.21, vec3(0.53, 0.44, 0.52), vec3(0.40, 0.36, 0.36), vec3(1.29, 1.27, 1.32), vec3(0.10, 0.19, 0.85));
	col = mod(col * 2.54, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
