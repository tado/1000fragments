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
        vec2 im = vec2(sin(t * 0.37 + jf * 4.0), cos(t * 0.29 * jf)) * 0.99;
        xs += sin(length(p - im) * 124.91 - t * 4.67 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 19.23 + t * 0.73 + ph) * 0.7;
    float wb = sin(p.y * 7.37 - t * 3.89 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.61;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.68;
	p = fract(p * 1.25) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.41);
	float d = d1 + d2;
	vec3 col = palette(d * 0.70 + time * 0.22, vec3(0.50, 0.46, 0.57), vec3(0.37, 0.41, 0.46), vec3(0.79, 0.91, 1.34), vec3(0.36, 0.51, 0.97));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
